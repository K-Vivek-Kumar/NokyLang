#include "NokySupport.h"

int Calculator::add(int a, int b)
{
    return a + b;
}

int Calculator::subtract(int a, int b)
{
    return a - b;
}

int Calculator::multiply(int a, int b)
{
    return a * b;
}

int Calculator::divide(int a, int b)
{
    if (b == 0)
    {
        return 0; // Error handling: Division by zero
    }
    return a / b;
}
