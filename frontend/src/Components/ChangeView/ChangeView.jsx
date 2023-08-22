import { useState } from "react"
import { LuGrid, LuTable2 } from "react-icons/lu"
import getDataView from '../../Utils/Helper/getDataView'
import './ChangeView.scss';

const ChangeView = () => {
    const [view, setView] = useState(getDataView());

    const change = () => {
        if (view === 'default') {
            setView('grid')
            localStorage.setItem('view', 'grid')
        } else {
            setView('default')
            localStorage.setItem('view', 'default')
        }
    }

    return <div className="ChangeView">
        <div className="selected">
            <div className="change-btn" onClick={change}>
                <div className="icons">
                    {view === "default" ? (<LuTable2 />) : (<LuGrid />)}
                </div>
            </div>
        </div>
    </div>
}

export default ChangeView