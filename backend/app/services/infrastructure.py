import pandas as pd


def load_infra_data():
    df = pd.read_html("https://ppit.big.go.id/smartcommunity")[0]
    df.columns = [
        "object_id", "village_name", "village_index", "potential", "market",
        "roads", "schools", "internet", "social_media", "irrigation", "banks",
        "cooperation", "cooperation", "umkm", "community", "tradition",
        "university", "regulation", "aksi"
    ]

    df = df.drop(columns=["aksi"])

    return df.to_dict(orient="records")
