import {
  component$,
} from '@builder.io/qwik';


import { TeamMemberCard } from '~/components/TeamMemberCard';

export default component$(() => {
  const teamMembers = [
    {
      name: 'Teddy Duncker',
      title: 'Team Captain + Mechanical',
      description:
        'Runs team',
      imageUrl: '/sean.jpg',
    },
    {
      name: 'Eli Pratt',
      title: 'Mechanical Lead',
      description:
        'Runs mech and does mech',
      imageUrl: '/sean.jpg',
    },
    {
      name: 'Avaninder Bhaghayath',
      title: 'Programming Lead',
      description:
        'Runs prog',
      imageUrl: '/sean.jpg',
    },
    {
        name: 'Minghan Zou',
        title: 'Outreach Lead',
        description:
          'Runs outreach',
        imageUrl: '/sean.jpg',
      },
  ];
  return (
    <div class='bg-gray-900 text-gray-100 mt-[10vh] min-h-screen p-8'>
      <div class='mx-auto mt-[0]  max-w-7xl'>
        <h1 class='mb-8 text-center text-4xl font-bold'>Our Team</h1>
        <div class='flex flex-wrap justify-center gap-6'>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              class='min-w-[250px] max-w-[300px] flex-1'
            >
              <TeamMemberCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
