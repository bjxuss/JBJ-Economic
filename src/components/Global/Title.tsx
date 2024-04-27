interface Ititle {
    title: string
}

export default function Title(props: Ititle) {
  return (
    <div className="flex justify-center items-center text-7xl text-black font-medium pt-10">
        {props.title}
      </div>
  )
}
