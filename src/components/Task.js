import ImageModal from './taskComponents/ImageModal';
import Tasks from "./taskComponents/TaskAction";

function Task(props){
    const {
        tasks,
        graphicRepresentation,
        modalIsOpen,
        setIsOpen
    } = props;

    return(
        <>
          {/* <img src={graphicRepresentation} /> */}
        <div>
            <ImageModal
              graphicRepresentation = {graphicRepresentation}
              modalIsOpen = {modalIsOpen}
              setIsOpen = {setIsOpen}
            />
            <Tasks
              tasks = {tasks}
            />
        </div>
        </>
    )
}

export default Task;
