"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";

import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { Url } from "next/dist/shared/lib/router/router";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({
  url,
  preview,
}: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  
  const onRemove = async () => {
    try {
      if (url) {
        await edgestore.publicFiles.delete({ url });
      }

      if (params.documentId) {
        await axios.patch(`/api/getdocuments/${params.documentId}/removecover`, {
          coverImage: null,
        });
      }
    } catch (error) {
      console.error("Error removing cover:", error);
    }
  };


  return (
    <div className={cn(
      "relative w-full h-[35vh] group",
      !url && "h-[12vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover"
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]" />
  )
}