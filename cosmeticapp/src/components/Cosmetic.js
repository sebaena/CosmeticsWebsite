import CosmeticImage from "./CosmeticImage";
import CosmeticTitle from "./CosmeticTitle";
import CosmeticIngredients from "./CosmeticIngredients";

const Cosmetic = (props) => {
  return (
    <div className="cosmetic">
      <CosmeticImage cosmetic={props.cosmetic} />
      <CosmeticTitle cosmetic={props.cosmetic} />
      <CosmeticIngredients cosmetic={props.cosmetic} idx={props.idx}/>
    </div>
  );
};

export default Cosmetic;
