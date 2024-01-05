import { useNavigate } from "react-router-dom";

import * as z from "zod"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FileUploader, Loader } from "../shared"
import { Textarea } from "../ui/textarea";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui";


type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};


const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { toast } = useToast();

  
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
      resolver: zodResolver(PostValidation),
      defaultValues: {
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post?.location : "",
        tags: post ? post?.tags.join(",") : ""
      },
    })
    
    //Query 
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

    // 2. Define a submit handler.
    async function onSubmit(value: z.infer<typeof PostValidation>) {
     
      // ACTION = UPDATE
      if (post && action === "Update") {
        const updatedPost = await updatePost({
          ...value,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl
        });

        if (!updatedPost) {
          toast({
            title: `${action} post failed. Please try again.`
          })
        }

        return navigate(`/posts/${post.$id}`)
      }

      const newPost = await createPost({
        ...value,
        userId: user.id,
      });

      if (!newPost) {
        toast({
          title: "Please try again."
        })
      }
      navigate("/");
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photo</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Art, Expression, Learn" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm