interface IProps {
    id: string;
    handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;    
    value: string;
}

export default function Select(props: IProps) {
  return (
    <select
      id={props.id}
      // onChange={(event) => handleNOptionChange(event, setSelect_n_options)}
      onChange={props.handleInputChange}
      value={props.value}
      className="w-22 h-10 rounded-md p-1"
    >
      <option value="1">Diario</option>
      <option value="2">Mensual</option>
      <option value="3">Trimestral</option>
      <option value="4">Cuatrimestral</option>
      <option value="5">Semestral</option>
      <option value="6">Anual</option>
    </select>
  );
}
