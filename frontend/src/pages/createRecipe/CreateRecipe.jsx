import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import RecipeComponent from "../../components/recipeComponent/RecipeComponent";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [season, setSeason] = useState("all");
  const [occasion, setOccasion] = useState("all");
  const [type, setType] = useState("");
  const [mealType, setMealType] = useState("all");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [servings, setServings] = useState("");
  const [error, setError] = useState("");
  const [ingredientIndex, setIngredientIndex] = useState(null);
  const [instructionIndex, setInstructionIndex] = useState(null);

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (!ingredientName || !quantity) {
      setError("Please enter ingredient name and quantity.");
      return;
    }
    const updatedIngredients = [...ingredients];
    if (ingredientIndex !== null) {
      updatedIngredients[ingredientIndex] = { name: ingredientName, quantity };
      setIngredientIndex(null);
    } else {
      updatedIngredients.push({ name: ingredientName, quantity });
    }
    setIngredients(updatedIngredients);
    setIngredientName("");
    setQuantity("");
  };

  const handleInstructionSubmit = (e) => {
    e.preventDefault();
    if (!instruction) {
      setError("Please enter instruction.");
      return;
    }
    const updatedInstructions = [...instructions];
    if (instructionIndex !== null) {
      updatedInstructions[instructionIndex] = instruction;
      setInstructionIndex(null);
    } else {
      updatedInstructions.push(instruction);
    }
    setInstructions(updatedInstructions);
    setInstruction("");
  };

  const handleIngredientDelete = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleInstructionDelete = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const handleIngredientUpdate = (index) => {
    const ingredientToUpdate = ingredients[index];
    setIngredientName(ingredientToUpdate.name);
    setQuantity(ingredientToUpdate.quantity);
    setIngredientIndex(index);
  };

  const handleInstructionUpdate = (index) => {
    const instructionToUpdate = instructions[index];
    setInstruction(instructionToUpdate);
    setInstructionIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !image ||
      ingredients.length === 0 ||
      !season ||
      !occasion ||
      !type ||
      !mealType ||
      !time ||
      !difficulty ||
      instructions.length === 0 ||
      !servings
    ) {
      setError("Please fill all the fields.");
      return;
    }
    if (time <= 0 || servings <= 0) {
      setError("Please enter a valid time and servings.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("season", season);
      formData.append("occasion", occasion);
      formData.append("type", type);
      formData.append("mealType", mealType);
      formData.append("time", time);
      formData.append("difficulty", difficulty);
      formData.append("instructions", JSON.stringify(instructions));
      formData.append("servings", servings);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/recipe/create-recipe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Recipe created successfully");
      navigate("/dashboard");
    } catch (error) {
      setError("Error creating recipe.");
    }
  };

  return (
    <>
      <Header />
      <RecipeComponent
        name={name}
        setName={setName}
        setImageFile={setImage}
        ingredientName={ingredientName}
        setIngredientName={setIngredientName}
        quantity={quantity}
        setQuantity={setQuantity}
        handleIngredientSubmit={handleIngredientSubmit}
        ingredients={ingredients}
        handleIngredientUpdate={handleIngredientUpdate}
        handleIngredientDelete={handleIngredientDelete}
        season={season}
        setSeason={setSeason}
        occasion={occasion}
        setOccasion={setOccasion}
        type={type}
        setType={setType}
        mealType={mealType}
        setMealType={setMealType}
        time={time}
        setTime={setTime}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        instruction={instruction}
        setInstruction={setInstruction}
        handleInstructionSubmit={handleInstructionSubmit}
        instructions={instructions}
        handleInstructionUpdate={handleInstructionUpdate}
        handleInstructionDelete={handleInstructionDelete}
        servings={servings}
        setServings={setServings}
        functionality="Create Recipe"
        handleSubmit={handleSubmit}
        error={error}
        image={image}
      />
    </>
  );
};

export default CreateRecipe;
