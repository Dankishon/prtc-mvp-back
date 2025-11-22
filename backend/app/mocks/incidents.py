# Мок-данные для списка инцидентов
INCIDENTS = [
    {
        "incident_id": 42,
        "detected_at": "2024-02-01T10:00:00Z",
        "status": "PROOF_READY"
    },
    {
        "incident_id": 17,
        "detected_at": "2024-02-01T11:15:00Z",
        "status": "NEW"
    }
]

# Мок-данные деталей инцидента
INCIDENT_DETAILS = {
    42: {
        "incident_id": 42,
        "commitment": "0x3f21b293c48bdf98791fc4aa29d3d097dc419c234e50413dd217e67881a937ac",
        "txHash": "0xd32a77c3fbd671989ec091e34bbda36f9b6aae2454d338e44a27bd74555de8cc",
        "proof_status": "READY",
        "proof": "0xabc123deadbeef",
        "public_inputs": {
            "threshold": 5,
            "failed_logins": 5,
            "window_seconds": 600
        }
    },
    17: {
        "incident_id": 17,
        "commitment": None,
        "txHash": None,
        "proof_status": "NOT_STARTED",
        "proof": None,
        "public_inputs": None
    }
}
