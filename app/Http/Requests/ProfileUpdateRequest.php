<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
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
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'city' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:9'],

            'schedule' => [
                'nullable',
                'string',
                'regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/',
                function ($attribute, $value, $fail) {
                    if ($value) {
                        [$start, $end] = explode('-', $value);
                        if (strtotime($start) >= strtotime($end)) {
                            $fail('L\'hora de fi ha de ser posterior a l\'hora d\'inici.');
                        }
                    }
                },
            ],
        ];
    }
}
