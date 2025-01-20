import { component$ } from '@builder.io/qwik';

interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const TeamMemberCard = component$((props: TeamMemberProps) => {
  return (
    <div 
      class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 border-2"
      style={{ width: '300px', height: '400px' }}
    >
      <img 
        src={props.imageUrl || "/placeholder.svg"} 
        alt={props.name} 
        width="100"
        height="100"
        class="w-full h-48 object-cover" 
        style={{ height: '150px' }} 
      />
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-2">{props.name}</h2>
        <h3 class="text-lg text-gray-400 mb-2">{props.title}</h3>
        <p class="text-gray-400">{props.description}</p>
      </div>
    </div>
  );
});
