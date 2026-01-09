import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import{
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const EmptyOrg = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
             src="/elem.png"
             alt="Empty"
             height={400}
             width={400}
            
            
            
            />
         
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to Arca
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an organization to get started

            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild >
                        <Button size="lg">
                            Create organization
                        </Button>

                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none sm:max-w-[430px] ">
                         <VisuallyHidden>
                              <DialogTitle>Create Organization</DialogTitle>
                        </VisuallyHidden>
                       <CreateOrganization />
                       
                    </DialogContent>
                    </Dialog> 
            </div>
        </div>
    );



};