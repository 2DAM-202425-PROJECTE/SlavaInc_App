<?php

namespace App\Http\Requests;

use App\Models\Worker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateWorkerRequest extends FormRequest
{
    public function authorize(): bool
    {
        $worker = $this->route('worker');
        $company = Auth::guard('company')->user();
        $workerAuth = Auth::guard('worker')->user();
        return $company || ($workerAuth && $workerAuth->is_admin && $workerAuth->company_id === $worker->company_id);
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
                Rule::unique(Worker::class)->ignore($this->route('worker')->id),
            ],
            'phone' => ['nullable', 'string', 'max:9'],
            'address' => ['nullable', 'string', 'max:255'],
            'schedule' => [
                'nullable',
                'string',
                'regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/',
            ],
            'is_admin' => ['nullable', 'boolean'],
        ];
    }

    public function messages()
    {
        return [
            'schedule.regex' => 'El format de l\'horari ha de ser HH:mm-HH:mm (ex. 08:00-16:00).',
            'email.lowercase' => 'El correu electrònic ha de ser en minúscules.',
            'email.unique' => 'Aquest correu electrònic ja està en ús.',
            'is_admin.boolean' => 'El camp administrador ha de ser un valor booleà (cert o fals).',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        \Log::error('Validation failed for worker update:', $validator->errors()->toArray());
        parent::failedValidation($validator);
    }
}
