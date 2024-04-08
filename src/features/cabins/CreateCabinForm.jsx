import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
	const { register, handleSubmit, reset, formState, getValues } = useForm();
	const { errors } = formState;
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New cabin created");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});
	function onSubmit(data) {
		mutate(data);
	}
	function onError(errors) {}
	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isLoading}
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isLoading}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Should be more than 0",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isLoading}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Should be more than 0",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isLoading}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount shouldn't be more than price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isLoading}
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image")}
					disabled={isLoading}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isLoading}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
