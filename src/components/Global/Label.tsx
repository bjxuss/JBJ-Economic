interface Iprops {
    labelname: string
}

export default function Label(props: Iprops) {
  return (
    <label className="text-xl text-black font-semibold">
      {props.labelname}
    </label>
  );
}
