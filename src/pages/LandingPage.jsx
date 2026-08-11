import Hero from '../components/Hero';
import Navbar from '/src/components/Navbar';
const LandingPage = () => {
    return (
        <div className='bg-[#F9F9FF]'>
            <Navbar />
            <main className='page-container'>
                <Hero/>
            </main>
        </div>
    )
}

export default LandingPage;