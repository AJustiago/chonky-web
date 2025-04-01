import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/adminLayout";
import { getRaffleById, createRaffle, updateRaffle } from "@/services/raffleService";
import { ArrowLeft, Save } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  prizeName: z.string().min(2, { message: "Prize name is required." }),
  prizeValue: z.coerce.number().positive({ message: "Prize value must be positive." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().min(1, { message: "End date is required." }),
  numberOfWinners: z.coerce.number().int().positive({ message: "Number of winners must be positive." }),
  status: z.enum(["ongoing", "finished", "upcoming"]),
  imageUrl: z.string().optional(),
  participants: z.coerce.number().int().nonnegative().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RaffleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === "new";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()

  const { data: raffle, isLoading } = useQuery({
    queryKey: ["raffle", id],
    queryFn: () => (isNew ? null : getRaffleById(id)),
    enabled: !isNew,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: raffle?.title || "",
      description: raffle?.description || "",
      prizeName: raffle?.prizeName || "",
      prizeValue: raffle?.prizeValue || 0,
      startDate: raffle?.startDate ? new Date(raffle.startDate).toISOString().split("T")[0] : "",
      endDate: raffle?.endDate ? new Date(raffle.endDate).toISOString().split("T")[0] : "",
      numberOfWinners: raffle?.numberOfWinners || 1,
      status: raffle?.status || "ongoing",
      imageUrl: raffle?.imageUrl || "",
      participants: raffle?.participants || 0,
    },
    values: raffle
      ? {
          ...raffle,
          startDate: new Date(raffle.startDate).toISOString().split("T")[0],
          endDate: new Date(raffle.endDate).toISOString().split("T")[0],
        }
      : undefined,
  });

  const createMutation = useMutation({
    mutationFn: createRaffle,
    onSuccess: () => {
      toast({
        title: "Raffle created",
        description: "Your new raffle has been created successfully.",
      });
      navigate("/raffle");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem creating the raffle.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormValues> }) => updateRaffle(id, data),
    onSuccess: () => {
      toast({
        title: "Raffle updated",
        description: "The raffle has been updated successfully.",
      });
      navigate("/raffle");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem updating the raffle.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      if (isNew) {
        const formattedValues = {
          ...values,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
          title: values.title,           // Ensure required fields are explicitly added
          description: values.description,
          prizeName: values.prizeName,
          prizeValue: values.prizeValue,
          numberOfWinners: values.numberOfWinners,
          status: values.status
        };
        await createMutation.mutateAsync(formattedValues);
      } else if (id) {
        const formattedValues = {
          ...values,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        };
        await updateMutation.mutateAsync({ id, data: formattedValues });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isNew && isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="h-16 w-16 rounded-full border-4 border-raffle-purple border-t-transparent animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/raffle")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Create New Raffle" : "Edit Raffle"}
          </h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter raffle title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="finished">Finished</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter raffle description"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="prizeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prize Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter prize name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prizeValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prize Value ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="numberOfWinners"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Winners</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Number of current participants (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the raffle image (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/raffle")}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-raffle-purple hover:bg-raffle-dark-purple"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Saving..." : "Save Raffle"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default RaffleDetailPage;
