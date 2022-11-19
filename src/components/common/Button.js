export default function Button({ title, type, onClick }) {
    return (
        <>
            <button
                onClick={onClick}
                className="cursor-pointer text-white bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-3 text-center hover:bg-white hover:text-blue-300 hover:border hover:border-black transition"
                type={`${type ? type : 'submit'}`}
            >
                {title}
            </button>
        </>
    );
}
