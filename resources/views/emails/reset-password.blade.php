<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Restablir Contrasenya</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background: linear-gradient(to right, #4f46e5, #6366f1);
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(to right, #4f46e5, #6366f1);
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
        .note {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Restablir la teva contrasenya</h1>
    </div>

    <div class="content">
        <p>Hola,</p>

        <p>Has rebut aquest correu perquè hem rebut una sol·licitud de restabliment de contrasenya per al teu compte.</p>

        <p style="text-align: center;">
            <a href="{{ $url }}" class="button">Restablir Contrasenya</a>
        </p>

        <p>Aquest enllaç de restabliment de contrasenya caducarà en 60 minuts.</p>

        <p>Si no has sol·licitat un restabliment de contrasenya, no cal que facis res més.</p>

        <div class="note">
            <p>Si tens problemes per fer clic al botó "Restablir Contrasenya", copia i enganxa l'URL següent al teu navegador web:</p>
            <p style="word-break: break-all;">{{ $url }}</p>
        </div>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. Tots els drets reservats.</p>
    </div>
</div>
</body>
</html>
