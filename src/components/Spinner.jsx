import spinner from "../assets/svg/Blocks-1s-200px.svg"

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center z-50 fixed left-0 top-0 bottom-0 right-0">
        <div>
            <img src={spinner} alt="Loading..." className="h-24" />
        </div>
    </div>
  )
}
