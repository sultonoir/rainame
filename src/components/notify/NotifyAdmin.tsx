"use client";
import React from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
} from "@nextui-org/react";
import { BellIcon } from "lucide-react";
import { api } from "@/trpc/react";
import Image from "next/image";

const NotifyAdmin = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { data } = api.user.getNotifyAdmin.useQuery();
	const ctx = api.useUtils();
	const { mutate } = api.user.readsNotify.useMutation({
		onSuccess: async () => {
			await ctx.user.getNotifyAdmin.refetch();
		},
	});
	const handleClick = () => {
		mutate();
	};
	return (
		<Popover
			shouldBlockScroll
			placement="bottom-start"
			isOpen={isOpen}
			onOpenChange={(open) => setIsOpen(open)}
		>
			<PopoverTrigger>
				<Button
					isIconOnly
					variant="light"
					radius="full"
					className="relative"
					onClick={handleClick}
				>
					{data?.admin?.hasNotify ? (
						<span className="absolute right-[8px] top-[8px] animate-pulse rounded-full border-[6px] border-primary text-primary" />
					) : null}
					<BellIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="px-1 py-2">
					<div className="flex h-fit max-h-[350px] w-[408px] flex-col gap-1 overflow-y-auto pb-2 scrollbar-hide">
						<div className="flex items-center justify-between border-b border-default-300 pb-2">
							<p className="text-xl font-semibold">Notifications</p>
						</div>
						{data && data.payments.length <= 0 && (
							<div className="flex items-center justify-center p-20 text-2xl">
								no notifications
							</div>
						)}
						{data?.payments.map((item) => (
							<div key={item.id} className="flex py-5 last:pb-0">
								<div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
									<a href={"/admin/payments"} className="absolute inset-0 z-10">
										<Image
											src={item.user.image ?? ""}
											alt={item.user.name ?? ""}
											fill
											className="aspect-square object-cover"
										/>
									</a>
								</div>
								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between">
											<div>
												<h3 className="pr-1 text-base font-medium">
													<a href={"/admin/payments"}>New order received</a>
												</h3>
												<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
													<span>
														{item.user.name} has has ordered{" "}
														{item.dataPayment.length} items
													</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default NotifyAdmin;
