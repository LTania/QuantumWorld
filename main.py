import numpy as np
from qiskit import QuantumCircuit, Aer, transpile, assemble, execute
from numpy.random import randint
from fractions import Fraction
from math import gcd
import time
from flask import Flask, request, jsonify, render_template
from qiskit.algorithms import Shor
from qiskit.utils import QuantumInstance

app = Flask(__name__)

def c_amod15(a, power):
    """Controlled multiplication by a mod 15"""
    if a not in [2,4,7,8,11,13]:
        raise ValueError("'a' must be 2,4,7,8,11 or 13")
    U = QuantumCircuit(4)
    for iteration in range(power):
        if a in [2,13]:
            U.swap(0,1)
            U.swap(1,2)
            U.swap(2,3)
        if a in [7,8]:
            U.swap(2,3)
            U.swap(1,2)
            U.swap(0,1)
        if a in [4, 11]:
            U.swap(1,3)
            U.swap(0,2)
        if a in [7,11,13]:
            for q in range(4):
                U.x(q)
    U = U.to_gate()
    U.name = "%i^%i mod 15" % (a, power)
    c_U = U.control()
    return c_U

def qft_dagger(n):
    """n-qubit QFTdagger the first n qubits in circ"""
    qc = QuantumCircuit(n)
    # Don't forget the Swaps!
    for qubit in range(n//2):
        qc.swap(qubit, n-qubit-1)
    for j in range(n):
        for m in range(j):
            qc.cp(-np.pi/float(2**(j-m)), m, j)
        qc.h(j)
    qc.name = "QFT†"
    return qc

np.random.seed(1) # This is to make sure we get reproduceable results
a = randint(2, 15)

def qpe_amod15(a):
    n_count = 8
    qc = QuantumCircuit(4+n_count, n_count)
    for q in range(n_count):
        qc.h(q)     # Initialize counting qubits in state |+>
    qc.x(3+n_count) # And auxiliary register in state |1>
    for q in range(n_count): # Do controlled-U operations
        qc.append(c_amod15(a, 2**q),
                 [q] + [i+n_count for i in range(4)])
    qc.append(qft_dagger(n_count), range(n_count)) # Do inverse-QFT
    qc.measure(range(n_count), range(n_count))
    # Simulate Results
    aer_sim = Aer.get_backend('aer_simulator')
    # Setting memory=True below allows us to see a list of each sequential reading
    t_qc = transpile(qc, aer_sim)
    qobj = assemble(t_qc, shots=1)
    result = aer_sim.run(qobj, memory=True).result()
    readings = result.get_memory()
    print("Register Reading: " + readings[0])
    phase = int(readings[0],2)/(2**n_count)
    print("Corresponding Phase: %f" % phase)
    return phase


@app.route('/')
def home():
    return jsonify({'title': 'Api is working. Hello Tania!'})

@app.route('/shor15')
def shor15():
    N = 15
    a = 7
    factor_found = False
    attempt = 0
    start = time.time()
    while not factor_found:
        attempt += 1
        print("\nAttempt %i:" % attempt)
        phase = qpe_amod15(a) # Phase = s/r
        frac = Fraction(phase).limit_denominator(N) # Denominator should (hopefully!) tell us r
        r = frac.denominator
        print("Result: r = %i" % r)
        if phase != 0:
            # Guesses for factors are gcd(x^{r/2} ±1 , 15)
            guesses = [gcd(a**(r//2)-1, N), gcd(a**(r//2)+1, N)]
            end = time.time()
            print("Guessed Factors: %i and %i" % (guesses[0], guesses[1]))
            print('Time: ' + str(end - start))
            for guess in guesses:
                if guess not in [1,N] and (N % guess) == 0: # Check to see if guess is a factor
                    print("*** Non-trivial factor found: %i ***" % guess)
                    factor_found = True
    return jsonify({'res': guesses, 'time': end-start })

@app.route('/shor')
def find_shor(): 
    backend = Aer.get_backend('aer_simulator')
    quantum_instance = QuantumInstance(backend, shots = 1000)
    args = request.args
    number = int(args.get("number"))

    shor = Shor(quantum_instance = quantum_instance)
    start = time.time()
    result = shor.factor(number)
    end = time.time()
    print('number: ' + str(number) + ' and time: ' + str(end - start))
    print(f"The list of factors of {number} as computed by Shor's algorithm is {result.factors[0]}.")
    return jsonify({
        'res': result.factors[0],
        'time': end-start
    })



if __name__ == "__main__":
    app.run(debug=True, port=8095)