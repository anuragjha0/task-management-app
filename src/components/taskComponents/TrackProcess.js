function openModal(setIsOpen) {
    setIsOpen(true);
  }

// graphical representation of process instance
export async function trackProcess(id, setGraphicRepresentation, setIsOpen){
    setGraphicRepresentation(null);
    const img = `http://flowable-poc.corp.adobe.com:8080/flowable-ui/process-api/runtime/process-instances/${id}/diagram`

    setGraphicRepresentation(img);
    openModal(setIsOpen);
}
