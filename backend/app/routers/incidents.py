from fastapi import APIRouter
from app.mocks.incidents import (
    INCIDENTS,
    INCIDENT_DETAILS
)

router = APIRouter()


@router.get("/incidents")
def list_incidents():
    """
    Список всех инцидентов.
    """
    return INCIDENTS


@router.get("/incidents/{incident_id}")
def get_incident_details(incident_id: int):
    """
    Детальная информация об инциденте.
    """
    return INCIDENT_DETAILS.get(
        incident_id,
        {"error": "Incident not found"}
    )

