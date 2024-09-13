# IPD-Model
[
    {name: hamza, speciality: IT},
    {name:QASIM, speciality: maintainance}
    {name: faizan, speciality: IT},
    {name:rafiq, speciality: maintainance}
    {name: hamza, speciality: IT},
    {name: muzammil, speciality: receptionist}
    {name: talha, speciality: receptionist}
]

i want output like

[
    [
        {name: hamza, speciality: IT},
        {name: faizan, speciality: IT},
          {name: hamza, speciality: IT},
    ],
    [
        {name:QASIM, speciality: maintainance},
        {name:rafiq, speciality: maintainance},
    ],
    [
        {name: muzammil, speciality: receptionist},
    {name: talha, speciality: receptionist}
    ]
]

sort speciality in alphabetic order