import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RecipeComponent from "../../components/recipeComponent/RecipeComponent";

const UpdateRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [season, setSeason] = useState("all");
  const [occasion, setOccasion] = useState("all");
  const [type, setType] = useState("all");
  const [mealType, setMealType] = useState("all");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [image, setImage] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [servings, setServings] = useState("");
  const { id } = useParams();
  const [ingredientIndex, setIngredientIndex] = useState(null);
  const [instructionIndex, setInstructionIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_BASEURL
          }/recipe/get-recipe-by-id/${id}`
        );
        const time = response.data.time.split(" ")[0];
        setName(response.data.name);
        setIngredients(response.data.ingredients);
        setSeason(response.data.season);
        setOccasion(response.data.occasion);
        setType(response.data.type);
        setMealType(response.data.mealType);
        setTime(time);
        setDifficulty(response.data.difficulty);
        setImage(response.data.image);
        setInstructions(response.data.instructions);
        setServings(response.data.servings);
      } catch (error) {
        setError("Error fetching recipe.");
      }
    };
    fetchRecipe();
  }, [id]);

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

  const handleIngredientUpdate = (index) => {
    const ingredient = ingredients[index];
    setIngredientName(ingredient.name);
    setQuantity(ingredient.quantity);
    setIngredientIndex(index);
  };

  const handleIngredientDelete = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleInstructionUpdate = (index) => {
    const instruction = instructions[index];
    setInstruction(instruction);
    setInstructionIndex(index);
  };

  const handleInstructionDelete = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !ingredients.length ||
      !season ||
      !occasion ||
      !type ||
      !mealType ||
      !time ||
      !difficulty ||
      !instructions.length ||
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
      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASEURL}/recipe/update-recipe/${id}`,
        {
          name,
          ingredients,
          season,
          occasion,
          type,
          mealType,
          time: `${time} minutes`,
          difficulty,
          image,
          instructions,
          servings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      setError("Error updating recipe.");
    }
  };

  return (
    <RecipeComponent
      name={name}
      setName={setName}
      ingredientName={ingredientName}
      setIngredientName={setIngredientName}
      quantity={quantity}
      setQuantity={setQuantity}
      handleIngredientSubmit={handleIngredientSubmit}
      image={image}
      setImage={setImage}
      instruction={instruction}
      setInstruction={setInstruction}
      handleInstructionSubmit={handleInstructionSubmit}
      servings={servings}
      setServings={setServings}
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
      handleSubmit={handleSubmit}
      ingredients={ingredients}
      handleIngredientUpdate={handleIngredientUpdate}
      handleIngredientDelete={handleIngredientDelete}
      instructions={instructions}
      handleInstructionUpdate={handleInstructionUpdate}
      handleInstructionDelete={handleInstructionDelete}
      functionality="Update Recipe"
      error={error}
      setImageFile={setImage}
    />
  );
};

export default UpdateRecipe;
