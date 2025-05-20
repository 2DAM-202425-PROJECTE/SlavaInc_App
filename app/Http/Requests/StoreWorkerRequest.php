<?php

namespace App\Http\Requests;

use App\Models\Worker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreWorkerRequest extends FormRequest
{
    public function authorize(): bool
    {
        $company = Auth::guard('company')->user();
        return $company !== null; // Only company users can create workers
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Worker::class),
            ],
            'phone' => ['nullable', 'string', 'max:9'],
            'address' => ['nullable', 'string', 'max:255'],
            'schedule' => [
                'nullable',
                'string',
                'regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/',
            ],
            'is_admin' => ['nullable', 'boolean'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'zip_code' => ['required', 'string', 'max:10'],
            'status' => ['required', Rule::in(['active', 'inactive'])],
        ];
    }

    public function messages()
    {
        return [
            'schedule.regex' => 'El format de l\'horari ha de ser HH:mm-HH:mm (ex. 08:00-16:00).',
            'email.lowercase' => 'El correu electrònic ha de ser en minúscules.',
            'email.unique' => 'Aquest correu electrònic ja està en ús.',
            'is_admin.boolean' => 'El camp administrador ha de ser un valor booleà (cert o fals).',
            'password.confirmed' => 'La confirmació de la contrasenya no coincideix.',
            'password.min' => 'La contrasenya ha de tenir almenys 8 caràcters.',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        \Log::error('Validation failed for worker store:', $validator->errors()->toArray());
        parent::failedValidation($validator);
    }
}
