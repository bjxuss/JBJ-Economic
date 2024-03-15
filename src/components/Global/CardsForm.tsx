import React from "react"

type ComponentsProps = {
  Component: React.ComponentType
}

const CardsForm: React.FC<ComponentsProps> = ({Component}) => {
  return (
    <>
    <div className="h-screen flex justify-center items-center">
      <div className="w-2/5 flex justify-center items-center">
        <div className="p-12 rounded-md w-full">
          <div className="flex flex-col md:flex-row justify-between gap-1">
            <div className="flex-1">
              <Component />

            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default CardsForm