import json
from typing import AnyStr, Any

from ulid import ULID
from starlette import status
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Request, BackgroundTasks, Depends, Body

from app.models import Village, QuestionnaireAnswer
from app.api.dependencies import SortModel, get_db, get_basic_user, get_jwt_user, get_pagination_meta

from app.api.analysis.bg_task import backfill_citizen_science
from app.api.questionnaire.dto import AnswerItemDetailDto, AnswerItem, QuestionnaireListResponse
from app.api.questionnaire.schemas import Q_CONSTANTS, Q_GROUP_STATUS, Q_SEX, Q_SEX_ANS

router = APIRouter()


@router.post("/", response_model=AnswerItem)
async def create(background_tasks: BackgroundTasks,
                 body: dict[str, Any] = Body(...),
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # check all the required fields are present
    all_keys = [x for x in body.keys()]
    required_keys = [x for x in Q_CONSTANTS.values()]

    for key in required_keys:
        if key not in all_keys:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail=f"Field {key} tidak ditemukan")

    # get the village
    villageFromBody = body[Q_CONSTANTS["village"]]
    village: Village = db.query(Village) \
        .filter((Village.id == villageFromBody) | (Village.name == villageFromBody)) \
        .first()

    # check if village exists
    if not village:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Desa tidak ditemukan")

    # create new answer
    answer = QuestionnaireAnswer(
        id=f"{QuestionnaireAnswer.get_id_prefix()}_{ULID()}",
        name=body[Q_CONSTANTS["name"]],
        sex=Q_SEX_ANS[body[Q_CONSTANTS["sex"]]],
        phone=body[Q_CONSTANTS["phone"]],
        status=body[Q_CONSTANTS["status"]],
        work_class=body[Q_CONSTANTS["work_class"]],
        json_content=json.dumps(body),
        village_id=village.id,
    )

    # save to database
    db.add(answer)
    db.commit()

    # run processing
    background_tasks.add_task(backfill_citizen_science, village.id, db)

    return AnswerItem(
        id=answer.id,
        name=answer.name,
        sex=Q_SEX[answer.sex],
        phone=answer.phone,
        status=Q_GROUP_STATUS[answer.status],
        workClass=answer.work_class,
        villageName=village.name,
    )


@router.get("/", response_model=QuestionnaireListResponse)
async def list_all(q: str | None = None,
                   sort_by: str = "id",
                   sort_order: SortModel = SortModel.asc,
                   page: int = 1,
                   page_size: int = 10,
                   db: Session = Depends(get_db),
                   _: str = Depends(get_jwt_user)):
    # build query
    query = db.query(QuestionnaireAnswer).join(Village)

    # search by keyword
    if q:
        query = query.filter(QuestionnaireAnswer.name.like(f"%{q}%"))

    # create sorting
    if sort_by == "id":
        if SortModel == SortModel.asc:
            query = query.order_by(QuestionnaireAnswer.id.asc())
        else:
            query = query.order_by(QuestionnaireAnswer.id.desc())
    elif sort_by == "name":
        if SortModel == SortModel.asc:
            query = query.order_by(QuestionnaireAnswer.name.asc())
        else:
            query = query.order_by(QuestionnaireAnswer.name.desc())
    elif sort_by == "sex":
        if SortModel == SortModel.asc:
            query = query.order_by(QuestionnaireAnswer.sex.asc())
        else:
            query = query.order_by(QuestionnaireAnswer.sex.desc())
    elif sort_by == "phone":
        if SortModel == SortModel.asc:
            query = query.order_by(QuestionnaireAnswer.phone.asc())
        else:
            query = query.order_by(QuestionnaireAnswer.phone.desc())
    elif sort_by == "status":
        if SortModel == SortModel.asc:
            query = query.order_by(QuestionnaireAnswer.status.asc())
        else:
            query = query.order_by(QuestionnaireAnswer.status.desc())
    elif sort_by == "workClass":
        if SortModel == SortModel.asc:
            query = query.order_by(QuestionnaireAnswer.work_class.asc())
        else:
            query = query.order_by(QuestionnaireAnswer.work_class.desc())

    # get total
    total = query.count()

    # get data
    data = query.offset((page - 1) * page_size) \
        .limit(page_size) \
        .all()

    data = [
        AnswerItem(id=v.id,
                   name=v.name,
                   sex=Q_SEX[v.sex],
                   phone=v.phone,
                   status=Q_GROUP_STATUS[v.status],
                   workClass=v.work_class,
                   villageName=v.village.name) for v in data
    ]

    return QuestionnaireListResponse(
        meta=get_pagination_meta(total, len(data), page, page_size),
        data=data,
    )


@router.get("/public/questions")
async def questions(db: Session = Depends(get_db),
                    _: str = Depends(get_basic_user)):
    # load questions
    with open("./app/data/questions.json", "r") as f:
        # replace villages
        villages = db.query(Village).order_by(Village.name.asc()).all()
        villages = [{"value": v.id, "label": v.name} for v in villages]

        # load all questions
        questions = f.read()

        # replace the question village
        questions = questions.replace('{{DOMISILI_HERE}}',
                                      json.dumps(villages))

        # return as json
        return json.loads(questions)


@router.get("/{id}", response_model=AnswerItemDetailDto)
async def get(id: str,
              db: Session = Depends(get_db),
              _: str = Depends(get_jwt_user)):
    # find answer
    answer: QuestionnaireAnswer = db.query(QuestionnaireAnswer) \
        .join(Village) \
        .filter(QuestionnaireAnswer.id == id) \
        .first()

    # check if answer exists
    if not answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Kuesioner tidak ditemukan")

    return AnswerItemDetailDto(id=answer.id,
                               name=answer.name,
                               sex=Q_SEX[answer.sex],
                               phone=answer.phone,
                               status=Q_GROUP_STATUS[answer.status],
                               workClass=answer.work_class,
                               villageName=answer.village.name,
                               content=json.loads(answer.json_content))


@router.put("/{id}", response_model=AnswerItem)
async def update(id: str,
                 background_tasks: BackgroundTasks,
                 body: dict[str, Any] = Body(...),
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find answer
    answer: QuestionnaireAnswer = db.query(QuestionnaireAnswer) \
        .join(Village) \
        .filter(QuestionnaireAnswer.id == id) \
        .first()

    # check if answer exists
    if not answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Kuesioner tidak ditemukan")

    # update answer
    answer.name = body[Q_CONSTANTS["name"]]
    answer.sex = Q_SEX_ANS[body[Q_CONSTANTS["sex"]]]
    answer.phone = body[Q_CONSTANTS["phone"]]
    answer.status = body[Q_CONSTANTS["status"]]
    answer.work_class = body[Q_CONSTANTS["work_class"]]
    answer.json_content = json.dumps(body)

    # save to database
    db.add(answer)
    db.commit()
    db.refresh(answer)

    # run processing
    background_tasks.add_task(backfill_citizen_science, answer.village_id, db)

    return AnswerItem(
        id=answer.id,
        name=answer.name,
        sex=Q_SEX[answer.sex],
        phone=answer.phone,
        status=Q_GROUP_STATUS[answer.status],
        workClass=answer.work_class,
        villageName=answer.village.name,
    )


@router.delete("/{id}")
async def delete(id: str,
                 background_tasks: BackgroundTasks,
                 db: Session = Depends(get_db),
                 _: str = Depends(get_jwt_user)):
    # find answer
    answer: QuestionnaireAnswer = db.query(QuestionnaireAnswer) \
        .filter(QuestionnaireAnswer.id == id) \
        .first()

    # check if answer exists
    if not answer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Kuesioner tidak ditemukan")

    # delete answer
    db.delete(answer)
    db.commit()

    # run processing
    background_tasks.add_task(backfill_citizen_science, answer.village_id, db)

    return None
