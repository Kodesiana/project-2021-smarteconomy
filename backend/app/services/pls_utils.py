from typing import List
from dataclasses import dataclass


@dataclass
class TransformRecord():
    parent: str
    target_name: str
    source_names: List[str]


rename_columns: List[TransformRecord] = [
    TransformRecord(parent="X1", target_name="WRG", source_names=["X1_4"]),
    TransformRecord(parent="X1",
                    target_name="PRODTANI",
                    source_names=["X1_19"]),
    TransformRecord(parent="X1",
                    target_name="PENGELUARAN",
                    source_names=["X1_29", "X1_30"]),
    TransformRecord(parent="X1",
                    target_name="MOTIVASI",
                    source_names=["X1_36A", "X1_36B", "X1_36D"]),
    TransformRecord(parent="X1",
                    target_name="LITERTIK",
                    source_names=[
                        "X1_39B", "X1_39C", "X1_39D", "X1_39E", "X1_39F",
                        "X1_39G"
                    ]),
    TransformRecord(
        parent="X2",
        target_name="LING",
        source_names=["X2_48", "X2_49", "X2_50", "X2_51", "X2_52", "X2_53"]),
    TransformRecord(parent="X3",
                    target_name="KOMUNITAS",
                    source_names=["X3_54", "X3_55", "X3_56", "X3_57"]),
    TransformRecord(parent="X3",
                    target_name="MATPEL",
                    source_names=[
                        "X3_58A", "X3_58B", "X3_58C", "X3_58D", "X3_58E",
                        "X3_58F", "X3_58G", "X3_58H", "X3_58I", "X3_58J",
                        "X3_58K", "X3_58L"
                    ]),
    TransformRecord(parent="X3",
                    target_name="METPEL",
                    source_names=[
                        "X3_59A", "X3_59B", "X3_59C", "X3_59D", "X3_59E",
                        "X3_59F", "X3_59G"
                    ]),
    TransformRecord(
        parent="X4",
        target_name="KEMPWIRAU",
        source_names=["X4_64A", "X4_64B", "X4_64C", "X4_64D", "X4_64E"]),
    TransformRecord(parent="X4",
                    target_name="KEMPPROMO",
                    source_names=["X4_65A", "X4_65B", "X4_65C", "X4_65D"]),
    TransformRecord(parent="X4",
                    target_name="PRODUKTIVITAS",
                    source_names=["X4_66A", "X4_66B", "X4_66C", "X4_66D"]),
    TransformRecord(parent="X4",
                    target_name="WRKFORCE",
                    source_names=["X4_67A", "X4_67B", "X4_67D"]),
    TransformRecord(parent="X4",
                    target_name="MULTIAKTOR",
                    source_names=["X4_68A", "X4_68B", "X4_68C", "X4_68D"]),
    TransformRecord(parent="X5",
                    target_name="SEMINOV",
                    source_names=[
                        "X5_69B", "X5_69D", "X5_69E", "X5_69F_1", "X5_69F_2",
                        "X5_69F_3", "X5_69H_1", "X5_69H_2", "X5_69H_3",
                        "X5_69M", "X5_69N", "X5_69O"
                    ]),
    TransformRecord(parent="X5",
                    target_name="KEMPINOV",
                    source_names=[
                        "X5_70A", "X5_70B", "X5_70C", "X5_70D", "X5_70E_1",
                        "X5_70E_2", "X5_70E_3", "X5_70F_1", "X5_70F_2",
                        "X5_70F_3", "X5_70G", "X5_70H", "X5_70I", "X5_70J"
                    ]),
    TransformRecord(parent="X5",
                    target_name="KEMPTRANSF",
                    source_names=[
                        "X5_71A", "X5_71B", "X5_71C", "X5_71D", "X5_71E_1",
                        "X5_71E_2", "X5_71E_3", "X5_71F_1", "X5_71F_2",
                        "X5_71F_3", "X5_71G", "X5_71H", "X5_71I", "X5_71J"
                    ]),
    TransformRecord(parent="X5",
                    target_name="KEMPDANA",
                    source_names=[
                        "X5_72A", "X5_72B", "X5_72C_1", "X5_72C_2", "X5_72C_3",
                        "X5_72D_1", "X5_72D_2", "X5_72D_3", "X5_72E", "X5_72F",
                        "X5_72G", "X5_72H"
                    ]),
    TransformRecord(parent="Y1",
                    target_name="ADAPTASI",
                    source_names=["Y1_60A", "Y1_60B"]),
    TransformRecord(parent="Y1",
                    target_name="MANUSAHA",
                    source_names=["Y1_61A", "Y1_61B"]),
    TransformRecord(parent="Y1",
                    target_name="DECISIONMAKING",
                    source_names=["Y1_62A", "Y1_62B"]),
    TransformRecord(parent="Y1",
                    target_name="KERJASAMA",
                    source_names=["Y1_63A", "Y1_63B", "Y1_63C"]),
    TransformRecord(parent="Y2",
                    target_name="TEKNOLOGI",
                    source_names=["Y2_73", "Y2_80", "Y2_87"]),
    TransformRecord(parent="Y2",
                    target_name="INTERNET",
                    source_names=["Y2_74", "Y2_81", "Y2_88"]),
    TransformRecord(parent="Y2",
                    target_name="TIK",
                    source_names=["Y2_75", "Y2_82", "Y2_89"]),
    TransformRecord(parent="Y2",
                    target_name="RND",
                    source_names=["Y2_76", "Y2_83", "Y2_90"]),
    TransformRecord(parent="Y2",
                    target_name="LISTRIK",
                    source_names=["Y2_77", "Y2_84", "Y2_91"]),
    TransformRecord(parent="Y2",
                    target_name="AIR",
                    source_names=["Y2_78", "Y2_85", "Y2_92"]),
    TransformRecord(parent="Y2",
                    target_name="INFRA",
                    source_names=["Y2_79", "Y2_86", "Y2_93"]),
    TransformRecord(parent="Y2",
                    target_name="STARTUP",
                    source_names=["Y2_94", "Y2_95"]),
    TransformRecord(parent="Y2",
                    target_name="MODAL",
                    source_names=["Y2_96", "Y2_97", "Y2_98", "Y2_99"]),
    TransformRecord(parent="Y2",
                    target_name="PORTAL",
                    source_names=["Y2_100", "Y2_101", "Y2_102"]),
    TransformRecord(parent="Y2",
                    target_name="WORKFORCE",
                    source_names=["Y2_103", "Y2_104", "Y2_105"]),
    TransformRecord(
        parent="Y2",
        target_name="PENGUSAHA",
        source_names=["Y2_106", "Y2_107", "Y2_108", "Y2_109", "Y2_110"]),
    TransformRecord(parent="Y2",
                    target_name="TRADISI",
                    source_names=[
                        "Y2_111", "Y2_112", "Y2_113", "Y2_114", "Y2_115",
                        "Y2_116", "Y2_117", "Y2_118"
                    ]),
]

# rename_columns: List[TransformRecord] = [
#     TransformRecord(parent="KARAKTER_WARGA", target_name="WRG", source_names=["X1_4"]),
#     TransformRecord(parent="KARAKTER_WARGA", target_name="PRODTANI", source_names=["X1_19"]),
#     TransformRecord(parent="KARAKTER_WARGA", target_name="PENGELUARAN", source_names=["X1_29", "X1_30"]),
#     TransformRecord(parent="KARAKTER_WARGA", target_name="MOTIVASI", source_names=["X1_36A", "X1_36B", "X1_36D"]),
#     TransformRecord(parent="KARAKTER_WARGA", target_name="LITERTIK", source_names=["X1_39B", "X1_39C", "X1_39D", "X1_39E", "X1_39F", "X1_39G"]),
#     TransformRecord(parent="LINGKUNGAN", target_name="LING", source_names=["X2_48", "X2_49", "X2_50", "X2_51", "X2_52", "X2_53"]),
#     TransformRecord(parent="KOMUNITAS", target_name="KOMUNITAS", source_names=["X3_54", "X3_55", "X3_56", "X3_57"]),
#     TransformRecord(parent="KOMUNITAS", target_name="MATPEL", source_names=["X3_58A", "X3_58B", "X3_58C", "X3_58D", "X3_58E", "X3_58F", "X3_58G", "X3_58H", "X3_58I", "X3_58J", "X3_58K", "X3_58L"]),
#     TransformRecord(parent="KOMUNITAS", target_name="METPEL", source_names=["X3_59A", "X3_59B", "X3_59C", "X3_59D", "X3_59E", "X3_59F", "X3_59G"]),
#     TransformRecord(parent="KEWIRAUSAHAAN", target_name="KEMPWIRAU", source_names=["X4_64A", "X4_64B", "X4_64C", "X4_64D", "X4_64E"]),
#     TransformRecord(parent="KEWIRAUSAHAAN", target_name="KEMPPROMO", source_names=["X4_65A", "X4_65B", "X4_65C", "X4_65D"]),
#     TransformRecord(parent="KEWIRAUSAHAAN", target_name="PRODUKTIVITAS", source_names=["X4_66A", "X4_66B", "X4_66C", "X4_66D"]),
#     TransformRecord(parent="KEWIRAUSAHAAN", target_name="WRKFORCE", source_names=["X4_67A", "X4_67B", "X4_67D"]),
#     TransformRecord(parent="KEWIRAUSAHAAN", target_name="MULTIAKTOR", source_names=["X4_68A", "X4_68B", "X4_68C", "X4_68D"]),
#     TransformRecord(parent="INOVASI", target_name="SEMINOV", source_names=["X5_69B", "X5_69D", "X5_69E", "X5_69F_1", "X5_69F_2", "X5_69F_3", "X5_69H_1", "X5_69H_2", "X5_69H_3", "X5_69M", "X5_69N", "X5_69O"]),
#     TransformRecord(parent="INOVASI", target_name="KEMPINOV", source_names=["X5_70A", "X5_70B", "X5_70C", "X5_70D", "X5_70E_1", "X5_70E_2", "X5_70E_3", "X5_70F_1", "X5_70F_2", "X5_70F_3", "X5_70G", "X5_70H", "X5_70I", "X5_70J"]),
#     TransformRecord(parent="INOVASI", target_name="KEMPTRANSF", source_names=["X5_71A", "X5_71B", "X5_71C", "X5_71D", "X5_71E_1", "X5_71E_2", "X5_71E_3", "X5_71F_1", "X5_71F_2", "X5_71F_3", "X5_71G", "X5_71H", "X5_71I", "X5_71J"]),
#     TransformRecord(parent="INOVASI", target_name="KEMPDANA", source_names=["X5_72A", "X5_72B", "X5_72C_1", "X5_72C_2", "X5_72C_3", "X5_72D_1", "X5_72D_2", "X5_72D_3", "X5_72E", "X5_72F", "X5_72G", "X5_72H"]),
#     TransformRecord(parent="KEBERDAYAAN", target_name="ADAPTASI", source_names=["Y1_60A", "Y1_60B"]),
#     TransformRecord(parent="KEBERDAYAAN", target_name="MANUSAHA", source_names=["Y1_61A", "Y1_61B"]),
#     TransformRecord(parent="KEBERDAYAAN", target_name="DECISIONMAKING", source_names=["Y1_62A", "Y1_62B"]),
#     TransformRecord(parent="KEBERDAYAAN", target_name="KERJASAMA", source_names=["Y1_63A", "Y1_63B", "Y1_63C"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="TEKNOLOGI", source_names=["Y2_73", "Y2_80", "Y2_87"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="INTERNET", source_names=["Y2_74", "Y2_81", "Y2_88"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="TIK", source_names=["Y2_75", "Y2_82", "Y2_89"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="RND", source_names=["Y2_76", "Y2_83", "Y2_90"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="LISTRIK", source_names=["Y2_77", "Y2_84", "Y2_91"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="AIR", source_names=["Y2_78", "Y2_85", "Y2_92"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="INFRA", source_names=["Y2_79", "Y2_86", "Y2_93"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="STARTUP", source_names=["Y2_94", "Y2_95"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="MODAL", source_names=["Y2_96", "Y2_97", "Y2_98", "Y2_99"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="PORTAL", source_names=["Y2_100", "Y2_101", "Y2_102"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="WORKFORCE", source_names=["Y2_103", "Y2_104", "Y2_105"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="PENGUSAHA", source_names=["Y2_106", "Y2_107", "Y2_108", "Y2_109", "Y2_110"]),
#     TransformRecord(parent="SMART_ECONOMY", target_name="TRADISI", source_names=["Y2_111", "Y2_112", "Y2_113", "Y2_114", "Y2_115", "Y2_116", "Y2_117", "Y2_118"]),
# ]
