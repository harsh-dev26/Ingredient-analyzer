import UnsafeIngredientsList from "@/components/UnsafeIngredientsList";

export default function Database() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Ingredients Database</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our comprehensive database of potentially harmful ingredients found in consumer products. 
          Filter by risk level to learn about specific health concerns.
        </p>
      </div>
      
      <UnsafeIngredientsList />
    </div>
  );
}