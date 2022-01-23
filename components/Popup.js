import Classes from './styles/Popup.module.scss'
import {BiArrowBack} from 'react-icons/bi'

function Popup(props) {
if(props.trigger === true){
    return (
        <div className={Classes.popup}>
            <div className={Classes.popupInner}>
                <label className={Classes.popupCloseBtn} onClick={() => props.setTrigger(false)}><BiArrowBack size={30}/></label>
                {props.children}
            </div>
        </div>
    )
}else{return null}
}

export default Popup