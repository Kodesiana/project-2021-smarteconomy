import warnings
from typing import Tuple, List, Dict

import pandas as pd

import plspm.config as c
from plspm.plspm import Plspm
from plspm.scale import Scale
from plspm.scheme import Scheme
from plspm.mode import Mode

from app.services import pls_utils


def get_index_multichoice(col: pd.Index) -> str:
    return next((i for i, j in enumerate(col.tolist())
                 if len(str(j)) > 0 and int(j) > 0), 0)


def generate_filter_list(dataframe: pd.DataFrame,
                         column_prefixes: List[str]) -> List[str]:
    columns = [
        dataframe.filter(regex=prefix).columns for prefix in column_prefixes
    ]
    return [item for sublist in columns for item in sublist]


def preprocess_columns(
        df: pd.DataFrame,
        rename_to_target=True) -> Tuple[pd.DataFrame, Dict, List[str]]:
    # rename columns to upper case
    df.columns = map(lambda x: str(x).upper(), df.columns)

    # drop all columns that starts with X0_ or DOC_ID
    df = df.drop(columns=df.filter(regex="_IGNORE"))
    df = df.drop(columns=df.filter(regex="^X0_"))
    df = df.drop(columns=["DOC_ID"])

    # drop all colums that ends with "_A"
    drop_y2_a_columns = [col for col in df.columns if col.endswith("_A")]
    df = df.drop(drop_y2_a_columns, axis=1)

    # rename all columns that ends with "_B" to ""
    rename_y2_b_columns = [col for col in df.columns if col.endswith("_B")]
    map_y2_b_columns = {
        col: col.replace("_B", "")
        for col in rename_y2_b_columns
    }

    df = df.rename(columns=map_y2_b_columns)

    # aggregate columns for X1_29 and X1_30
    df["X1_29"] = df[["X1_29_1", "X1_29_2", "X1_29_3",
                      "X1_29_4"]].apply(get_index_multichoice, axis=1)
    df["X1_30"] = df[["X1_30_1", "X1_30_2", "X1_30_3",
                      "X1_30_4"]].apply(get_index_multichoice, axis=1)

    # drop unused columns
    df = df.drop(columns=[
        "X1_29_1", "X1_29_2", "X1_29_3", "X1_29_4", "X1_30_1", "X1_30_2",
        "X1_30_3", "X1_30_4"
    ])

    # map original columns to new columns name, key: old column, value: new column
    if rename_to_target:
        first_order_column_map = {}
        for transform_record in pls_utils.rename_columns:
            for i, column in enumerate(transform_record.source_names):
                first_order_column_map[
                    column] = transform_record.target_name + str(i + 1)

        # rename colums
        df = df.rename(columns=first_order_column_map)

    # drop unused questions
    cols_drop = generate_filter_list(df, [
        "_ALASAN", "_LAINNYA", "_INFO", "_TAHUN", "_FREKUENSI", "_YN", "X1_41"
    ])
    df = df.drop(cols_drop, axis=1)

    # convert all columns to numeric
    df = df.apply(lambda series: pd.to_numeric(series, errors='coerce'))
    df = df.dropna()

    # get first order columns, e.g. X1, X2, ...
    first_order_columns_head = [col.parent for col in pls_utils.rename_columns]

    # get all questions for first order columns, e.g. X1_warga_0, X1_produktivitas_tani_0, ...
    first_order_columns = [col.target_name for col in pls_utils.rename_columns]

    # map first order columns to all questions, e.g. X1: X1_warga_0 ...; X2: X2_X2_0, ...
    second_order_columns_dict = {}
    for column in first_order_columns_head:
        second_order_columns_dict[column] = [
            c.target_name for c in pls_utils.rename_columns
            if c.parent == column
        ]

    return df, second_order_columns_dict, first_order_columns


def rename_variables(df: pd.DataFrame) -> pd.DataFrame:
    return df.reset_index().replace(regex=True,
                                    to_replace={
                                        "X1": "KARAKTER_WARGA",
                                        "X2": "LINGKUNGAN",
                                        "X3": "KOMUNITAS",
                                        "X4": "KEWIRAUSAHAAN",
                                        "X5": "INOVASI",
                                        "Y1": "KEBERDAYAAN",
                                        "Y2": "SMART_ECONOMY",
                                    })


def create_structure() -> c.Structure:
    # create structure
    structure = c.Structure()
    structure.add_path(["X1"], ["Y1"])
    structure.add_path(["X2"], ["X1", "Y1"])
    structure.add_path(["X3"], ["X1", "X2", "Y2"])
    structure.add_path(["X4"], ["Y2"])
    structure.add_path(["X5"], ["Y2"])
    structure.add_path(["Y1"], ["X4", "X5", "Y2"])

    return structure


def internal_calculate_sempls(df: pd.DataFrame, config: c.Config) -> Dict:
    # create plspm
    plspm_calc = Plspm(df, config, Scheme.PATH, tolerance=0.1)

    return {
        "inner_model":
        rename_variables(plspm_calc.inner_model()).to_dict(orient="records"),
        "inner_summary":
        rename_variables(plspm_calc.inner_summary()).to_dict(orient="records"),
        "effects":
        rename_variables(plspm_calc.effects()).to_dict(orient="records"),
    }


def calculate_first_order(df: pd.DataFrame) -> Dict:
    # preprocess columns to parent name
    df, _, _ = preprocess_columns(df, rename_to_target=False)

    # create structure
    structure = create_structure()

    # create scheme
    config = c.Config(structure.path(), default_scale=Scale.NUM)
    config.add_lv_with_columns_named("X1", Mode.A, df, "X1")
    config.add_lv_with_columns_named("X2", Mode.A, df, "X2")
    config.add_lv_with_columns_named("X3", Mode.A, df, "X3")
    config.add_lv_with_columns_named("X4", Mode.A, df, "X4")
    config.add_lv_with_columns_named("X5", Mode.A, df, "X5")
    config.add_lv_with_columns_named("Y1", Mode.A, df, "Y1")
    config.add_lv_with_columns_named("Y2", Mode.A, df, "Y2")

    # calculate sempls
    return internal_calculate_sempls(df, config)


def calculate_second_order(df: pd.DataFrame) -> Dict:
    # preprocess columns to parent name
    df, second_order_columns_dict, first_order_columns = preprocess_columns(
        df, rename_to_target=True)

    # create structure
    structure = create_structure()

    # create scheme
    config = c.Config(structure.path(), default_scale=Scale.NUM)

    for so, so_cols in second_order_columns_dict.items():
        config.add_higher_order(so, Mode.A, so_cols)

    for fo in first_order_columns:
        config.add_lv_with_columns_named(fo, Mode.A, df, fo)

    # calculate sempls
    return internal_calculate_sempls(df, config)


def calculate_sempls(df: pd.DataFrame, order: int) -> Dict:
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        if order == 1:
            return calculate_first_order(df)
        elif order == 2:
            return calculate_second_order(df)
        else:
            raise ValueError("Invalid order")
