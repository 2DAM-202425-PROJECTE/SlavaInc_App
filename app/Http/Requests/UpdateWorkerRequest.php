<?php

namespace App\Http\Requests;

use App\Models\Worker;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWorkerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Permitir a los usuarios autenticados (puedes ajustar según tus necesidades)
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
                Rule::unique(Worker::class)->ignore($this->worker->id),
            ],
            'phone' => ['nullable', 'string', 'max:9'],
            'address' => ['nullable', 'string', 'max:255'],
            'schedule' => [
                'nullable',
                'string',
                'regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/', // Valida HH:mm-HH:mm
            ],
        ];
    }

    public function messages()
    {
        return [
            'schedule.regex' => 'El format de l\'horari ha de ser HH:mm-HH:mm (ex. 08:00-16:00).',
            'email.lowercase' => 'El correu electrònic ha de ser en minúscules.',
            'email.unique' => 'Aquest correu electrònic ja està en ús.',
        ];
    }
}
