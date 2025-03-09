import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface ColorwayManagerProps {
  colorways: string[];
  setColorways: (colorways: string[]) => void;
}

const ColorwayManager = ({ colorways, setColorways }: ColorwayManagerProps) => {
  const [newColorway, setNewColorway] = useState('');

  const addColorway = () => {
    if (!newColorway.trim()) {
      toast.error('Please enter a colorway name');
      return;
    }
    
    if (colorways.includes(newColorway.trim())) {
      toast.error('This colorway already exists');
      return;
    }
    
    setColorways([...colorways, newColorway.trim()]);
    setNewColorway('');
  };

  const removeColorway = (index: number) => {
    const newColorways = [...colorways];
    newColorways.splice(index, 1);
    setColorways(newColorways);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addColorway();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          value={newColorway}
          onChange={(e) => setNewColorway(e.target.value)}
          placeholder="Add new colorway"
          className="flex-1"
          onKeyDown={handleKeyPress}
        />
        <Button 
          onClick={addColorway} 
          variant="outline" 
          size="icon"
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {colorways.length > 0 && (
        <div className="space-y-2">
          {colorways.map((colorway, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 rounded-md bg-muted/50 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-sm flex-1">{colorway}</div>
              <Button
                onClick={() => removeColorway(index)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorwayManager;