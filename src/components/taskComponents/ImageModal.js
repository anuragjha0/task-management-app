import Modal from 'react-modal';

function ImageModal(props){
    const {
        modalIsOpen,
        setIsOpen,
        graphicRepresentation,
    } = props;

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    let subtitle;
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    return(
        <>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Diagram"
        >
            <button onClick={closeModal}>close</button>
            <img src={graphicRepresentation} alt="img"/>
        </Modal>
        </>
    )

}

export default ImageModal;
