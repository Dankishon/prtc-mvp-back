# =============== Мок-данные компаний страховщика ===============

COMPANIES = [
    {
        "company_id": "acme",
        "company_name": "ACME Corporation",
        "incidents_with_proof": 3
    },
    {
        "company_id": "globex",
        "company_name": "Globex Industries",
        "incidents_with_proof": 1
    },
    {
        "company_id": "initech",
        "company_name": "Initech Ltd.",
        "incidents_with_proof": 0
    }
]


# =============== Мок-данные инцидентов по компаниям ===============

COMPANY_INCIDENTS = {
    "acme": [
        {
            "incident_id": 42,
            "commitment": "0x3f21b293c48bdf98791fc4aa29d3d097dc419c23...",
            "proof_ready": True,
            "proof_verified": False,
            "txHash": "0xd32a77c3fbd671989ec091e34bbda36f9b6aae2454d33..."
        },
        {
            "incident_id": 55,
            "commitment": "0xaa91b293c48bdf98791fc4aa29d3d097dc419c23...",
            "proof_ready": False,
            "proof_verified": False,
            "txHash": None
        }
    ],
    "globex": [
        {
            "incident_id": 17,
            "commitment": "0xbb71b293c48bdf98791fc4aa29d3d097dc419c23...",
            "proof_ready": True,
            "proof_verified": True,
            "txHash": "0xabababababababababababababababababababab"
        }
    ],
    "initech": []
}


# =============== Карточки инцидентов для страховщика ===============

INCIDENT_CARDS = {
    42: {
        "incident_id": 42,
        "commitment_offchain": "0x3f21b293c48bdf98791fc4aa29d3d097dc419c234e50...",
        "commitment_onchain": "0x3f21b293c48bdf98791fc4aa29d3d097dc419c234e50...",
        "commitments_match": True,
        "proof": "0xabc123deadbeef",
        "public_inputs": {
            "threshold": 5,
            "failed_logins": 5,
            "window_seconds": 600
        },
        "verification_status": "NOT_VERIFIED",
        "txHash": "0xd32a77c3fbd671989ec091e34bbda36f9b6aae2454d33..."
    },

    55: {
        "incident_id": 55,
        "commitment_offchain": "0xaa91b293c48bdf98791fc4aa29d3d097dc419c234e50...",
        "commitment_onchain": None,
        "commitments_match": False,
        "proof": None,
        "public_inputs": None,
        "verification_status": "NOT_VERIFIED",
        "txHash": None
    },

    17: {
        "incident_id": 17,
        "commitment_offchain": "0xbb71b293c48bdf98791fc4aa29d3d097dc419c234e50...",
        "commitment_onchain": "0xbb71b293c48bdf98791fc4aa29d3d097dc419c234e50...",
        "commitments_match": True,
        "proof": "0x777777deadbeefcccccccc1111111111",
        "public_inputs": {
            "threshold": 3,
            "failed_logins": 3,
            "window_seconds": 300
        },
        "verification_status": "VERIFIED",
        "txHash": "0xabababababababababababababababababababab"
    }
}
