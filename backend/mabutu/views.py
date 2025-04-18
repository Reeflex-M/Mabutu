from django.shortcuts import render
from .models import Customer
from rest_framework import generics, status
from .serializers import CustomerSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User


class CustomerCreate(generics.CreateAPIView):
    # API endpoint that allows creation of a new customer
    queryset = (Customer.objects.all(),)
    serializer_class = CustomerSerializer


class CustomerList(generics.ListAPIView):
    # API endpoint that allows customer to be viewed.
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetail(generics.RetrieveAPIView):
    # API endpoint that returns a single customer by pk.
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerUpdate(generics.RetrieveUpdateAPIView):
    # API endpoint that allows a customer record to be updated.
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDelete(generics.RetrieveDestroyAPIView):
    # API endpoint that allows a customer record to be deleted.
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Cette vue renvoie les informations de l'utilisateur connecté.
    Elle est protégée et nécessite un token JWT valide.
    """
    user = request.user
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff
    }
    return Response(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Vue pour inscrire un nouvel utilisateur.
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "Inscription réussie",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
