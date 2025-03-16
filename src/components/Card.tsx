import { useState } from "react";
import page1Img from "/Screenshot_2025-03-15_155156-removebg-preview.png";
import flag from "/Flags.png";

const Card: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Any Cuisine");
  const [budget, setBudget] = useState<string>("");
  const [serving, setServing] = useState<string>("");
  const [dietRequirements, setDietRequirements] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string>("");
  const [additionalReq, setAdditionalReq] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleBudgetInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudget(event.target.value);
  };

  const handleServingInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServing(event.target.value);
  };

  const handleAllergiesInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAllergies(event.target.value);
  };

  const handleAdditionalReqInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdditionalReq(event.target.value);
  };

  const handleLetHimCook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Submit your data
    handleSubmit();
    // Navigate to the loading screen (slide9)
    window.location.hash = "#slide9";
    // After 7 seconds, navigate to slide10
    setTimeout(() => {
      window.location.hash = "#slide10";
    }, 7000);
  };

  const handleDietRequirements = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    setDietRequirements((prevDiet) => {
      if (checked) {
        return [...prevDiet, value];
      } else {
        return prevDiet.filter((item) => item !== value);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://unihack25.onrender.com/create-file",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            filter_option: selectedValue,
            budget: budget,
            servings: serving,
            diet_requirements: dietRequirements,
            food_allergies: allergies,
            additional_requirements: additionalReq,
          }),
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response
        .text()
        .catch(() => ({ message: "No JSON response" }));
      console.log("File created:", data);
    } catch (error) {
      console.error("error with file creation:", error);
    }
  };

  return (
    <div className=" flex justify-center h-[90%] w-[60%] items-center flex-col rounded-4xl p-10">
      <div className="flex h-full w-full ">
        <div className="carousel carousel-center w-full snap-x snap-mandatory overflow-x-hidden scroll-smooth rounded-4xl">
          <div
            id="slide1"
            className="carousel-item relative w-full snap-start "
          >
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-center items-center w-full h-full rounded-4xl bg-amber-100 flex-col pt-16 gap-y-6">
              <h1 className="text-5xl text-[#492b03] suranna-regular">
                Affordable Eats,
                <br /> Tailored for you
              </h1>
              <img src={page1Img} className="p-5 h-[60%] w-[]" />
              <a
                href="#slide2"
                className="btn btn-outline rounded-4xl text-[#492b03] h-auto w-auto font-normal hover:text-white mb-15 hover:bg-[#492b03]"
              >
                <p className="py-3 px-8 tracking-widest text-2xl ">START</p>
              </a>
            </div>
          </div>
          <div
            id="slide2"
            className="carousel-item relative w-full snap-start "
          >
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-center items-center w-full h-full bg-amber-100 flex-col text-[#492b03]">
              <h1 className="text-5xl text-[#492b03] mt-10 mb-5 suranna-regular">
                Select your cuisine!
              </h1>
              <img src={flag} alt="Flags" className="h-50 w-auto mb-5" />
              <form className="mb-20 text-2xl">
                <select onChange={handleSelectChange} value={selectedValue}>
                  <option value="">Select an option</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mexican">Mexican</option>
                </select>
              </form>
              <a
                href="#slide3"
                className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03] "
              >
                <p className="py-1 px-3 tracking-widest text-2xl">next</p>
              </a>
            </div>
          </div>
          <div
            id="slide3"
            className="carousel-item relative w-full snap-start bg-yellow-50"
          >
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-center items-center bg-amber-100 h-full w-full flex-col gap-y-2">
              <h1 className="text-5xl text-[#492b03] suranna-regular">What's your budget?</h1>
              <label className="input mt-20 bg-[#492b03] px-4">
                <p className="text-2xl text-[#492b03] bg-#fae9b9">$</p>
                <input
                  type="text"
                  value={budget}
                  onChange={handleBudgetInputChange}
                  placeholder="00.00"
                  className="input input-accent input-xl bg-[#824f03] px-4 py-4 "
                />
              </label>
              <div className="flex gap-2">
                <a
                  href="#slide2"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide4"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] suranna-regular">Number of Servings:</h1>
              <label className="input">
                <p className="text-2xl text-[#492b03]">Servings: </p>
                <input
                  type="text"
                  value={serving}
                  onChange={handleServingInputChange}
                  placeholder="realistic number pls"
                  className="input input-accent input-xl"
                />
              </label>

              <div>
                <div className="flex gap-2">
                  <a
                    href="#slide3"
                    className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                  >
                    <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                  </a>
                  <a
                    href="#slide5"
                    className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                  >
                    <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="slide5" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] suranna-regular">Food Allergies:</h1>
              <label className="input">
                <p className="text-2xl text-[#492b03]">no no foods:</p>
                <input
                  type="text"
                  value={allergies}
                  onChange={handleAllergiesInputChange}
                  placeholder=""
                  className="input input-accent input-xl"
                />
              </label>
              <div className="flex gap-2">
                <a
                  href="#slide4"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide6"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>

          <div id="slide6" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] suranna-regular">Dietary Requirements:</h1>

              <fieldset className="flex flex-col">
                <label className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    value="halal"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("halal")}
                    className="checkbox"
                  />
                  <p className="text-[#492b03]">Halal</p>
                </label>
                <label className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    value="vegetarian"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("vegetarian")}
                    className="checkbox"
                  />
                  <p className="text-[#492b03]">Vegetarian</p>
                </label>
                <label className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    value="vegan"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("vegan")}
                    className="checkbox"
                  />
                  <p className="text-[#492b03]">Vegan</p>
                </label>
                <label className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    value="lactose intolerant"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("lactose intolerant")}
                    className="checkbox"
                  />
                  <p className="text-[#492b03]"> Lactose Intolerant</p>
                </label>
                <label className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    value="gluten free"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("gluten free")}
                    className="checkbox"
                  />
                  <p className="text-[#492b03]"> Gluten Free</p>
                </label>
              </fieldset>
              <div className="flex gap-2">
                <a
                  href="#slide5"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide7"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>

          <div id="slide7" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] suranna-regular">
                Additional Requirements:
              </h1>
              <label className="input">
                <p className="text-2xl text-[#492b03]"></p>
                <input
                  type="text"
                  value={additionalReq}
                  onChange={handleAdditionalReqInputChange}
                  placeholder="etc, high protein meals pls"
                  className="input input-accent input-xl"
                />
              </label>
              <div className="flex gap-2">
                <a
                  href="#slide6"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide8"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>

          <div id="slide8" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] suranna-regular">
                shall we get your recipe?
              </h1>
              <div className="flex gap-2">
                <a
                  href="#slide7"
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <button
                  className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                  onClick={handleLetHimCook}
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">
                    LET HIM COOK
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div id="slide9" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-3xl text-[#492b03] suranna-regular">
                Please wait a couple of seconds while your personal chef to cook
                <span className="loading loading-dots loading-md ml-3"></span>
              </h1>
              <div className="flex flex-row">
                <p className="text-[#492b03] text-2xl">ChatGPT rn:</p>
                <img src="https://i.imgflip.com/91lmtp.gif" />
              </div>
            </div>
          </div>

          <div
            id="slide10"
            className="carousel-item relative w-full snap-start"
          >
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-amber-100 flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] suranna-regular">Your recipe!</h1>
              <div className="flex gap-2">
                <p className="text-[#492b03]">RESULTS:</p>
              </div>
              <button
                className="btn btn-outline rounded-4xl text-white h-auto w-auto font-thin text-2xl"
                onClick={handleLetHimCook}
              >
                <p className="py-1 px-3 tracking-widest text-2xl">
                  LET HIM COOK (smth else)
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
