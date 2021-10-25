from .serializers import NoteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Note
from rest_framework import status

class NoteView(APIView):
    def get(self, request, format=None):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteViewDelete(APIView):
    def delete(self, request, id, format=None):
        note = Note.objects.get(id=id)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NoteViewPut(APIView):
    def put(self, request, id, format=None):
        note = Note.objects.get(id=id)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
