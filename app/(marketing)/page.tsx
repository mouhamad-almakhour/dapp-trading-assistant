import ExploreBtn from "@/components/ExploreBtn";
import FeatureSlider from "@/components/FeatureSlider";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl">
        The #1 Dapp Trading Assistant <br />
        for your crypto needs
      </h1>
      <p className="text-center mt-5">
        Real-time gas prices, token swaps, and market insights. All in one
        place!
      </p>
      <ExploreBtn />

      <FeatureSlider />
    </section>
  );
};

export default Home;
