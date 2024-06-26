import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const { id: editId, ...editValues } = cabinToEdit;
	const isEdit = Boolean(editId);
	const { register, handleSubmit, reset, formState, getValues } = useForm({
		defaultValues: isEdit ? editValues : {},
	});
	const { errors } = formState;

	const isWorking = isCreating || isEditing;
	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEdit)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				},
			);
		else
			createCabin(
				{ ...data, image },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				},
			);
	}
	function onError(errors) {}
	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEdit ? false : "This field is required",
					})}
					disabled={isWorking}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEdit ? "Edit Cabin" : "Add cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
