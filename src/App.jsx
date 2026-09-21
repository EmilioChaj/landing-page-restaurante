import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Reservations from './components/Reservations/Reservations';
import Gallery from './components/Gallery/Gallery';
import Location from './components/Location/Location';
import Reviews from './components/Reviews/Reviews';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Menu />
        <Reservations />
        <Gallery />
        <Location />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}

export default App;
