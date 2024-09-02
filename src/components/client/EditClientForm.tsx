"use client";

import { $Enums } from "@prisma/client";

interface EditClientProps {
  data: {
    id: string;
    name: string;
    status: $Enums.ClientStatus;
    category: $Enums.ClientCategory;
    workSuspended: boolean;
  };
}

export default function EditClientForm({ data }: EditClientProps) {
  return <div>Edit ClientForm</div>;
}
