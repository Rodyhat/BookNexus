import CreateAccount from '../components/CreateAccount';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Navbar from '/src/components/Navbar';
const LandingPage = () => {
    return (
        <div className='bg-[#F9F9FF]'>
            <Navbar />
            <main className='page-container'>
                <Hero/>
                <CreateAccount/>
                <Trending/>
            </main>
        </div>
    )
}

export default LandingPage;