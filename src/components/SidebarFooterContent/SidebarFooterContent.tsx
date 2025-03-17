import { Avatar, AvatarFallback } from '@app/components/Avatar/Avatar';
import { LogOut, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/Popover/Popover';

import { Button } from '@app/components/Button/Button';
import { ChevronRightIcon } from 'lucide-react';

const SidebarFooterContent = () => {
  const getColorForLetter = (letter: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
    ];
    const index = letter.charCodeAt(0) % colors.length; // Get a consistent color
    return colors[index];
  };

  return (
    <div className="py-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between gap-3 !bg-transparent shadow-none">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className={`text-base text-white ${getColorForLetter('A')}`}></AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-base font-semibold text-gray-500"> {'Ameen'}</span>
              </div>
            </div>
            <ChevronRightIcon className="h-8 w-8 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" sideOffset={10}>
          <div className="flex flex-col gap-1">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SidebarFooterContent;
