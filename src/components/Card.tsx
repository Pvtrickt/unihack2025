import { useState, useMemo } from "react";
import page1Img from "/Screenshot_2025-03-15_155156-removebg-preview.png";
import flag from "/Flags.png";
import Cash from "/Cash.png";
import Coin from "/Coin.png";
import Plate from "/Plate.png";
import No from "/No.png";

const Card: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("Any Cuisine");
  const [budget, setBudget] = useState<string>("");
  const [serving, setServing] = useState<string>("");
  const [dietRequirements, setDietRequirements] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string>("");

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
      const response = await fetch("http://localhost:5001/create-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter_option: selectedValue,
          budget: budget,
          servings: serving,
          diet_requirements: dietRequirements,
          food_allergies: allergies,
        }),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response
        .json()
        .catch(() => ({ message: "No JSON response" }));
      console.log("File created:", data);
    } catch (error) {
      console.error("error with file creation:", error);
    }
  };

  const exclusionZoneForButtons = {
    topMin: 5,  // Exclude positions from 75% down to 100% vertically
    topMax: 95, 
    leftMin: 10,  // Exclude the full width (or adjust if your buttons only take part of the width)
    leftMax: 90,
  };

  interface ImagePosition {
    id: number;
    centerTop: number;   // as percentage (0-100)
    centerLeft: number;  // as percentage (0-100)
    width: number;       // base width in pixels
    angle: number;       // in degrees
  }
  
  // Collision detection: check if two rectangles overlap.
  const isOverlapping = (
    a: { left: number; top: number; width: number; height: number },
    b: { left: number; top: number; width: number; height: number }
  ) => {
    return !(
      a.left + a.width < b.left ||
      a.left > b.left + b.width ||
      a.top + a.height < b.top ||
      a.top > b.top + b.height
    );
  };
  
  const generateRandomPositions = (
    count: number,
    exclusion: { topMin: number; topMax: number; leftMin: number; leftMax: number }
  ): ImagePosition[] => {
    // Fixed container dimensions (adjust if needed)
    const containerWidth = 1000;
    const containerHeight = 600;
    const positions: ImagePosition[] = [];
    let iterations = 0;
    const maxIterations = 2000;
  
    while (positions.length < count && iterations < maxIterations) {
      iterations++;
  
      // Generate candidate center as percentages.
      const centerTop = Math.random() * 100;
      const centerLeft = Math.random() * 100;
  
      // Skip if candidate center is within the exclusion zone.
      if (
        centerTop >= exclusion.topMin &&
        centerTop <= exclusion.topMax &&
        centerLeft >= exclusion.leftMin &&
        centerLeft <= exclusion.leftMax
      ) {
        continue;
      }
  
      // Random base width between 50 and 150px, and random angle (0-360).
      const width = 50 + Math.random() * 100;
      const angle = Math.random() * 360;
  
      // Convert angle to radians.
      const rad = (angle * Math.PI) / 180;
      // Compute the effective size of the rotated square.
      const effectiveSize = width * (Math.abs(Math.cos(rad)) + Math.abs(Math.sin(rad)));
  
      // Convert candidate center (percentage) to pixel coordinates.
      const centerX = (centerLeft / 100) * containerWidth;
      const centerY = (centerTop / 100) * containerHeight;
  
      // Calculate the candidate's effective bounding box.
      const candidateBox = {
        left: centerX - effectiveSize / 2,
        top: centerY - effectiveSize / 2,
        width: effectiveSize,
        height: effectiveSize,
      };
  
      // Check collision against already accepted images.
      let collides = false;
      for (let pos of positions) {
        const posRad = (pos.angle * Math.PI) / 180;
        const posEffectiveSize = pos.width * (Math.abs(Math.cos(posRad)) + Math.abs(Math.sin(posRad)));
        const posCenterX = (pos.centerLeft / 100) * containerWidth;
        const posCenterY = (pos.centerTop / 100) * containerHeight;
        const posBox = {
          left: posCenterX - posEffectiveSize / 2,
          top: posCenterY - posEffectiveSize / 2,
          width: posEffectiveSize,
          height: posEffectiveSize,
        };
  
        if (isOverlapping(candidateBox, posBox)) {
          collides = true;
          break;
        }
      }
  
      if (collides) continue;
  
      // Candidate accepted.
      positions.push({
        id: positions.length,
        centerTop,
        centerLeft,
        width,
        angle,
      });
    }
  
    return positions;
  };

  const MIN_IMAGES = 20;
  const randomNoImages = useMemo(
  () => generateRandomPositions(MIN_IMAGES, exclusionZoneForButtons),
  []
  );

  const randomCashImages = useMemo(
  () => generateRandomPositions(MIN_IMAGES, exclusionZoneForButtons),
  []
  );

  const randomCoinImages = useMemo(
  () => generateRandomPositions(MIN_IMAGES, exclusionZoneForButtons),
  []
  );

  const randomPlateImages = useMemo(
  () => generateRandomPositions(MIN_IMAGES, exclusionZoneForButtons),
  []
  );

  return (
    <div className="bg-amber-50 flex justify-center h-[90%] w-[60%] items-center flex-col rounded-4xl p-10">
      <div className="flex h-full w-full bg-[#fae9b9]">
        <div className="carousel carousel-center w-full snap-x snap-mandatory overflow-x-hidden scroll-smooth">
          <div
            id="slide1"
            className="carousel-item relative w-full snap-start "
          >
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-center items-center w-full h-full bg-[#fae9b9] flex-col">
              <h1 className="text-5xl text-[#492b03]">
                Affordable Eats,
                <br /> Tailored for you 
              </h1>
              <img src={page1Img} className="p-5 h-[60%] w-[]" />
              <a
                href="#slide2"
                className="btn btn-outline rounded-4xl text-[#492b03] h-auto w-auto font-normal hover:text-white mb-15 hover:bg-[#492b03]"
              >
                <p className="py-3 px-8 tracking-widest text-2xl">START</p>
              </a>
            </div>
          </div>
          <div
            id="slide2"
            className="carousel-item relative w-full snap-start "
          >
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-center items-center w-full h-full bg-amber-100 flex-col text-[#492b03]">
              <h1 className="text-5xl text-[#492b03] mt-10 mb-5">Select your cuisine!</h1>
              <img src={flag} alt="Flags" className="h-50 w-auto" />
              <form className = "mb-20 text-2xl">
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
          <div id="slide3" className="carousel-item relative w-full snap-start bg-yellow-50">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform justify-center items-center  h-full w-full flex-col gap-y-2">
              <h1 className="text-5xl text-[#492b03]">What's your budget?</h1>
              <div className="absolute inset-0 -z-10 pointer-events-none">
          {randomCashImages.map((img) => (
            <img
              key={img.id}
              src={Cash}
              alt="Cash"
              style={{
                position: "absolute",
                left: `${img.centerLeft}%`,
                top: `${img.centerTop}%`,
                width: `${img.width}px`,
                transform: `translate(-50%, -50%) rotate(${img.angle}deg)`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {randomCoinImages.map((img) => (
            <img
              key={img.id}
              src={Coin}
              alt="Coin"
              style={{
                position: "absolute",
                left: `${img.centerLeft}%`,
                top: `${img.centerTop}%`,
                width: `${img.width}px`,
                transform: `translate(-50%, -50%) rotate(${img.angle}deg)`,
              }}
            />
          ))}
        </div>
              <label className="input mt-20 bg-[#b46b0a] px-4 py-5 mb-10 ">
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
                  className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide4"
                  className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-[#fae9b9] flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] mb-10  ">Number of Servings:</h1>
              <div className="absolute inset-0 -z-10 pointer-events-none">
          {randomPlateImages.map((img) => (
            <img
              key={img.id}
              src={Plate}
              alt="Plate"
              style={{
                position: "absolute",
                left: `${img.centerLeft}%`,
                top: `${img.centerTop}%`,
                width: `${img.width}px`,
                transform: `translate(-50%, -50%) rotate(${img.angle}deg)`,
              }}
            />
          ))}
        </div>
              <label className="input mb-15">
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
                    className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                  >
                    <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                  </a>
                  <a
                    href="#slide5"
                    className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                  >
                    <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="slide5" className="carousel-item relative w-full snap-start">
            <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-[#fae9b9] flex-col justify-center items-center h-full w-full">
              <h1 className="text-5xl text-[#492b03] mb-10">Food Allergies:</h1>
<div className="absolute inset-0 -z-10 pointer-events-none">
          {randomNoImages.map((img) => (
            <img
              key={img.id}
              src={No}
              alt="No"
              style={{
                position: "absolute",
                left: `${img.centerLeft}%`,
                top: `${img.centerTop}%`,
                width: `${img.width}px`,
                transform: `translate(-50%, -50%) rotate(${img.angle}deg)`,
              }}
            />
          ))}
        </div>
              <label className="input mb-15">
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
                  className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide6"
                  className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>

          <div id="slide6" className="carousel-item relative w-full snap-start">
          <div className="absolute top-1/2 flex -translate-y-1/2 transform bg-[#fae9b9] flex-col justify-center items-center h-full w-full">
          <h1 className="text-5xl text-[#492b03]">Dietary Requirements:</h1>

          <fieldset className="flex flex-col">
                <label>
                  <input
                    type="checkbox"
                    value="halal"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("halal")}
                    className="checkbox"
                  />
                  Halal
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="vegetarian"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("vegetarian")}
                    className="checkbox"
                  />
                  Vegetarian
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="vegan"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("vegan")}
                    className="checkbox"
                  />
                  Vegan
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="lactose intolerant"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("lactose intolerant")}
                    className="checkbox"
                  />
                  Lactose Intolerant
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="gluten free"
                    onChange={handleDietRequirements}
                    checked={dietRequirements.includes("gluten free")}
                    className="checkbox"
                  />
                  Gluten Free
                </label>
              </fieldset>
              <div className="flex gap-2">
                <a
                  href="#slide5"
                  className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">back</p>
                </a>
                <a
                  href="#slide7"
                  className="btn btn-outline rounded-4xl px-10 py-2 text-[#492b03] font-normal text-2xl hover:text-white mb-15 hover:bg-[#492b03]"
                >
                  <p className="py-1 px-3 tracking-widest text-2xl">next</p>
                </a>
              </div>
            </div>
          </div>

          <div id="slide7" className="carousel-item relative w-full snap-start">
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between bg-[#fae9b9]">
              <a href="#slide6" className="btn btn-circle">
                ❮
              </a>
              <button
                className="btn btn-soft btn-accent"
                onClick={handleSubmit}
              >
                Gimme Recipe!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
