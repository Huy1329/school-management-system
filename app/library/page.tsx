"use client";

// Sửa thành
import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "motion/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
//import "@cyntler/react-doc-viewer/dist/index.css";
import { useLanguage } from "@/components/language-context";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  icons,
  ListStart,
  Search,
  Trash,
} from "lucide-react";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FileIcon } from "react-file-icon";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { Spinner } from "@/components/ui/spinner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
// import PdfViewer from "@/components/file-viewer/file-viewer";
import { Document, Page } from "react-pdf";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatBytes } from "@/hooks/use-file-upload";

export type TypeData = {
  file_name: string;
  user_email: string;
  download_url: string;
  title: string;
  label: string;
  date: string;
  file_class: string;
  type_file: string;
  file_size: string;
};

const getColumns = (t: any): ColumnDef<TypeData>[] => [
  /*{
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },*/
  {
    accessorKey: "user_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t.email}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("user_email")}</div>
    ),
  },
  {
    accessorKey: "file_name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t.fileName}
          <ArrowUpDown />
        </Button>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("file_name")}</div>
    ),
  },
  {
    accessorKey: "file_class",
    header: t.class,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("file_class")}</div>
    ),
  },
  {
    accessorKey: "label",
    header: t.subject,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("label")}</div>
    ),
  },
  {
    accessorKey: "file_size",
    header: t.file_Size,
    cell: ({ row }) => (
      <div className="capitalize text-sm">
        {formatBytes(row.getValue("file_size"))}
      </div>
    ),
  },
  {
    accessorKey: "type_file",
    header: t.file_Type,
    cell: ({ row }) => (
      <div className="capitalize text-sm">{row.getValue("type_file")}</div>
    ),
  },
  {
    id: "actions",
    header: t.actions,
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      const currentIndex = row.index;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.download_url)}
            >
              {t.copy_download_url}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => window.open(data.download_url, "_blank")}
            >
              {t.download}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={`http://localhost:3000/view-file?url=/uploads/${
                  data.user_email
                }/${encodeURIComponent(data.file_name)}`}
                target="_blank" // mở tab mới
                rel="noopener noreferrer"
              >
                {t.view_file}
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
type FileItem = { file_name: string; download_url: string; user_id?: string };


export default function HomeSearchPage() {
  const { t } = useLanguage();
  const classFilterData = [
  { value: "1", name: t.class1 },
  { value: "2", name: t.class2 },
  { value: "3", name: t.class3 },
  { value: "4", name: t.class4 },
  { value: "5", name: t.class5 },
  { value: "6", name: t.class6 },
  { value: "7", name: t.class7 },
  { value: "8", name: t.class8 },
  { value: "9", name: t.class9 },
  { value: "10", name: t.class10 },
  { value: "11", name: t.class11 },
  { value: "12", name: t.class12 },
];
  const subjectFilterData = [
    {
      id: 1,
      value: "math",
      name: t.math,
    },
    {
      id: 2,
      value: "physics",
      name: t.physics,
    },
    {
      id: 3,
      value: "chemistry",
      name: t.chemistry,
    },
    {
      id: 4,
      value: "computer-science",
      name: t.computer_science,
    },
    {
      id: 5,
      value: "english",
      name: t.s_english,
    },
  ];
  const [query, setQuery] = useState("");
  const [copy, setCopy] = useState(false);
  //const { t } = useLanguage();
  const [filter, setFilter] = useState({
    subject: [] as string[],
    class: [] as string[],
  });

  const [downloadUrl, setDownloadUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  function copyLink() {
    navigator.clipboard.writeText(downloadUrl);
    toast("Link Copied", {
      action: {
        label: "Close",
        onClick: () => "",
      },
    });

    setTimeout(
      () => {
        setCopy(false);
      },

      1500
    );

    setCopy(true);
  }
  const columnTranslations: Record<string, string> = {
    user_email: t.email,
    file_name: t.fileName,
    file_class: t.class,
    label: t.subject,
    file_size: t.file_Size,
    type_file: t.file_Type,
    actions: t.actions,
  };
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<
    {
      file_name: string;
      user_email: string;
      download_url: string;
      title: string;
      label: string;
      date: string;
      file_class: string;
      type_file: string;
      file_size: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Hàm gọi API tìm kiếm
  const handleSearch = async (searchText: string) => {
    setLoading(true);
    try {
      const url =
        searchText.trim() === ""
          ? "http://127.0.0.1:8000/search/all?query=*"
          : `http://127.0.0.1:8000/search/all?query=${encodeURIComponent(
              searchText
            )}`;

      const res = await fetch(url);
      const data = await res.json();
      console.log("Search All:", data);
      setResults(data.results || []);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm tất cả:", err);
    } finally {
      setIndex(results.length);
      setTimeout(() => setLoading(false), 500);
    }
  };

  // 🔹 Gọi API khi trang load lần đầu (lấy toàn bộ file)
  useEffect(() => {
    handleSearch("");
  }, []);

  // 🔹 Tự động tìm khi người dùng nhập (debounce 500ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  function toggleFilter(type: "subject" | "class", value: string) {
    setFilter((prev) => {
      const current = prev[type];
      const isSelected = current.includes(value);
      return {
        ...prev,
        [type]: isSelected
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }

// Xóa hàm toggleAll — không cần nữa

  const filteredResults = useMemo(() => {
    return results
      .slice()
      .reverse()
      .filter((file) => {
        // length === 0 nghĩa là không chọn gì → show all
        const matchSubject =
          filter.subject.length === 0 || filter.subject.includes(file.label);
        const matchClass =
          filter.class.length === 0 || filter.class.includes(file.file_class);
        return matchSubject && matchClass;
      });
  }, [results, filter]);

  const [docs, setDocs] = useState<{ uri: string }[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable<TypeData>({
    data: filteredResults,

    columns: getColumns(t),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const updatePageSize = useCallback(() => {
    if (!tableWrapperRef.current) return;
    const availableHeight = tableWrapperRef.current.clientHeight;
    const ROW_HEIGHT = 53;
    const HEADER_HEIGHT = 45;
    const newSize = Math.max(1, Math.floor((availableHeight - HEADER_HEIGHT) / ROW_HEIGHT));
    table.setPageSize(newSize);
  }, [table]);

  useEffect(() => {
    updatePageSize();
    const observer = new ResizeObserver(updatePageSize);
    if (tableWrapperRef.current) observer.observe(tableWrapperRef.current);
    return () => observer.disconnect();
  }, [updatePageSize]);

  return (
        <div className="w-full h-full px-12 pt-8 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 flex gap-4 items-center justify-between py-4">
            <InputGroup>
              <InputGroupInput
                placeholder={t.filterPlaceholder}
                value={
                  (table.getColumn("file_name")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("file_name")
                    ?.setFilterValue(event.target.value)
                }
                className="flex-shrink-0 flex gap-4 items-center justify-between py-4"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              {/*
              <InputGroupAddon align="inline-end">
                {results.length} results
              </InputGroupAddon>
              */}
            </InputGroup>
            <div>|</div>
            <div className="flex gap-4 items-center">
              {/*<div className="w-full justify-center  gap-6 flex items-center">
              </div>*/}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className=" "
                    >
                      <svg
                        data-testid="geist-icon"
                        height={16}
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width={16}
                        style={{
                          color: "currentcolor",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1 0H1.75H14.25H15V0.75V3V3.31066L14.7803 3.53033L10.5 7.81066V15.25V16H9.75H9H8.7816L8.59734 15.8827L5.84734 14.1327L5.5 13.9117V13.5V7.81066L1.21967 3.53033L1 3.31066V3V0.75V0ZM2.5 1.5V2.68934L6.78033 6.96967L7 7.18934V7.5V13.0883L9 14.361V7.5V7.18934L9.21967 6.96967L13.5 2.68934V1.5H2.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                    {(filter.subject.length > 0 || filter.class.length > 0) && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 border border-background" />
                    )}
                  </div>

                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command className="bg-black">
                    <CommandInput
                      placeholder="Search filter..."
                      className="h-9"
                    />
                    <ScrollArea>
                      <CommandList className="bg-black">
                        <CommandEmpty>{t.no_subjects_found}</CommandEmpty>
                        {/* All Subjects — check khi không có môn nào được chọn */}
                        <CommandGroup>
                          <CommandItem
                            value="all-subjects"
                            onSelect={() => setFilter((prev) => ({ ...prev, subject: [] }))}
                          >
                            {t.all_subjects}
                            <Check
                              className={cn(
                                "ml-auto",
                                filter.subject.length === 0 ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </CommandGroup>

                        <CommandGroup heading="Subject">
                          {subjectFilterData
                            .filter((d) => d.value !== "all")
                            .map((data) => (
                              <CommandItem
                                key={data.value}
                                value={data.value}
                                // Bỏ disabled
                                onSelect={() => toggleFilter("subject", data.value)}
                              >
                                {data.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    filter.subject.includes(data.value) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandSeparator />

                        {/* All Classes */}
                        <CommandGroup>
                          <CommandItem
                            value="all-classes"
                            onSelect={() => setFilter((prev) => ({ ...prev, class: [] }))}
                          >
                            {t.all_classes}
                            <Check
                              className={cn(
                                "ml-auto",
                                filter.class.length === 0 ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </CommandGroup>

                        <CommandGroup heading="Class">
                          {classFilterData
                            .filter((d) => d.value !== "all")
                            .map((data) => (
                              <CommandItem
                                key={data.value}
                                value={data.value}
                                // Bỏ disabled
                                onSelect={() => toggleFilter("class", data.value)}
                              >
                                {data.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    filter.class.includes(data.value) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <DropdownMenu onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    {t.columns} <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {columnTranslations[column.id] || column.id.replace("_", " ")}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div ref={tableWrapperRef} className="flex-1 min-h-0 overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                   {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.column.id === "user_email"
                            ? String(cell.getValue()).replace(
                                "-gmailcom",
                                "@gmail.com"
                              )
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={getColumns(t).length}
                      className="h-24 text-center"
                    >
                      {t.No_results}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex-shrink-0 flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                variant={"outline"}
                size={"sm"}
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={
                  table.getState().pagination.pageIndex === i
                    ? ""
                    : "text-[#a1a1a1]"
                }
              >
                {i + 1}
              </Button>
            ))}

            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
  );
}
