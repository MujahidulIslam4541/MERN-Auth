import { assets } from '../../public/assets'

const Header = () => {
    return (
        <div className="flex flex-col items-center text-center p-6 max-w-lg mx-auto">
            {/* Header Image */}
            <img
                src={assets.header_img}
                alt="Header"
                className="w-48 h-auto mb-6"
            />

            {/* Small Title with Wave */}
            <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-medium tracking-wide">Hey Developer</h2>
                <img src={assets.hand_wave} alt="Wave" className="w-6 h-6" />
            </div>

            {/* Main Title */}
            <h2 className="text-3xl font-bold mb-3">Welcome to our App</h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
                Let's start with a quick product tour and we will have you up
                and running in no time.
            </p>

            {/* Button */}
            <button className="border px-6 py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
                Get Started
            </button>
        </div>

    )
}

export default Header
