from fastapi import APIRouter
from app.mocks.incidents import INCIDENTS, INCIDENT_DETAILS

router = APIRouter()


@router.get("/incidents")
def get_incidents():
    """
    Возвращает список всех инцидентов (mvp mock)
    """
    return INCIDENTS


@router.get("/incident/{incident_id}")
def get_incident_details(incident_id: int):
    """
    Возвращает детали конкретного инцидента (mvp mock)
    """
    return INCIDENT_DETAILS.get(
        incident_id,
        {"error": "Incident not found"}
    )


@router.post("/incident/{incident_id}/generate-proof")
def generate_proof(incident_id: int):
    """
    Стартует процесс генерации ZK proof.
    В MVP — всегда успешный мок-ответ.
    """
    return {
        "incident_id": incident_id,
        "message": "Proof generation started"
    }
