import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import ImageUploader from '@/components/admin/image-uploader';
import { Eye } from 'lucide-react';
import { Product } from '@/types/product';

