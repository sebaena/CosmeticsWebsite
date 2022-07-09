import { useSelector } from 'react-redux';


const CosmeticDisplay = ({current_cosmetic})=> {
    return (
        <div>
            <img src={current_cosmetic.picture} />
            <p className="cosmetic-title">{current_cosmetic.name}</p>
        </div>
    )
}


export default CosmeticDisplay;